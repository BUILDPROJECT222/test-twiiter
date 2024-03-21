use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::program::invoke;

declare_id!("230smYGkKHwx5yDwAD3Eq36ugZLfWTsvb5KRTEYcPRX");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.tweet_count = 0;
        Ok(())
    }

    pub fn tweet(ctx: Context<Tweet>, topic: String, content: String) -> Result<()> {
        require!(topic.chars().count() <= 50, ErrorCode::TopicTooLong);
        require!(content.chars().count() <= 280, ErrorCode::ContentTooLong);

        let state = &mut ctx.accounts.state;
        let tweet = &mut ctx.accounts.tweet;
        tweet.id = state.tweet_count;
        tweet.author = *ctx.accounts.author.key;
        tweet.timestamp = Clock::get()?.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;
        tweet.likes = 0;
        state.tweet_count += 1;
        Ok(())
    }

    pub fn delete_tweet(ctx: Context<DeleteTweet>) -> Result<()> {
        let tweet = &mut ctx.accounts.tweet;
        require!(tweet.author == *ctx.accounts.author.key, ErrorCode::Unauthorized);
        Ok(())
    }

    pub fn like_tweet(ctx: Context<LikeTweet>) -> Result<()> {
        let tweet = &mut ctx.accounts.tweet;
        require!(tweet.author != *ctx.accounts.user.key, ErrorCode::CannotLikeOwnTweet);

        const TRANSFER_AMOUNT: u64 = 100_000; // Lamports (1 SOL = 1,000,000,000 Lamports)

        let transfer_instruction = system_instruction::transfer(
            &ctx.accounts.user.key, 
            &tweet.author, 
            TRANSFER_AMOUNT,
        );
        invoke(
            &transfer_instruction,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.author.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        tweet.likes += 1;
        Ok(())
    }


    pub fn update_profile(ctx: Context<UpdateProfile>, username: Option<String>, bio: Option<String>) -> Result<()> {
        if let Some(ref username) = username {
            require!(username.chars().count() <= 40, ErrorCode::UsernameTooLong);
            ctx.accounts.user_account.username = username.clone();
        }

        if let Some(ref bio) = bio {
            require!(bio.chars().count() <= 280, ErrorCode::BioTooLong);
            ctx.accounts.user_account.bio = bio.clone();
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub state: Account<'info, PlatformState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Tweet<'info> {
    #[account(init, payer = author, space = 8 + 32 + 8 + 50 * 4 + 280 * 4 + 8)]
    pub tweet: Account<'info, TweetAccount>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(mut)]
    pub state: Account<'info, PlatformState>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteTweet<'info> {
    #[account(
        mut,
        has_one = author, 
        close = author
    )]
    pub tweet: Account<'info, TweetAccount>,
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct LikeTweet<'info> {
    #[account(mut)]
    pub tweet: Account<'info, TweetAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub author: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
}

#[account]
pub struct PlatformState {
    pub tweet_count: u64,
}

#[account]
pub struct TweetAccount {
    pub id: u64,
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
    pub likes: u64,
}

#[account]
pub struct UserAccount {
    pub username: String,
    pub bio: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be a maximum of 50 characters.")]
    TopicTooLong,
    #[msg("The provided content should be a maximum of 280 characters.")]
    ContentTooLong,
    #[msg("The provided username should be a maximum of 40 characters.")]
    UsernameTooLong,
    #[msg("The provided bio should be a maximum of 280 characters.")]
    BioTooLong,
    #[msg("You cannot like your own tweet.")]
    CannotLikeOwnTweet,
    #[msg("Unauthorized action.")]
    Unauthorized,
}