/// social_platform.move
module social_fi::social_platform {
    use std::string::{Self, String};
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::coin;
    use aptos_framework::account;
    use social_fi::token::SocialFiToken;

    const POST_COST: u64 = 1000000; // Adjust based on your token decimals
    const LIKE_REWARD: u64 = 100000;

    struct User has key, store {
        username: String,
        profile_hash: String,
        followers: u64,
        following: u64
    }

    struct Post has key, store {
        author: address,
        content_hash: String,
        timestamp: u64,
        likes: u64
    }

    struct SocialStore has key {
        users: vector<User>,
        posts: vector<Post>,
        post_count: u64,
        user_events: EventHandle<UserEvent>,
        post_events: EventHandle<PostEvent>,
    }

    struct UserEvent has drop, store {
        user_addr: address,
        username: String
    }

    struct PostEvent has drop, store {
        post_id: u64,
        author: address,
        content_hash: String
    }

    const ENO_STORE: u64 = 1;
    const USER_EXISTS: u64 = 2;
    const INSUFFICIENT_FUNDS: u64 = 3;

    public entry fun initialize(account: &signer) {
        let store = SocialStore {
            users: vector::empty(),
            posts: vector::empty(),
            post_count: 0,
            user_events: event::new_event_handle<UserEvent>(account),
            post_events: event::new_event_handle<PostEvent>(account),
        };
        move_to(account, store);
    }

    public entry fun create_user(
        account: &signer,
        username: String,
        profile_hash: String
    ) acquires SocialStore {
        let addr = signer::address_of(account);
        let store = borrow_global_mut<SocialStore>(@social_fi);
        
        let user = User {
            username,
            profile_hash,
            followers: 0,
            following: 0
        };
        vector::push_back(&mut store.users, user);
        
        event::emit_event(
            &mut store.user_events,
            UserEvent {
                user_addr: addr,
                username
            }
        );
    }

    public entry fun create_post(
        account: &signer,
        content_hash: String
    ) acquires SocialStore {
        let author_addr = signer::address_of(account);
        
        // Handle token transfer
        coin::transfer<SocialFiToken>(account, @social_fi, POST_COST);
        
        let store = borrow_global_mut<SocialStore>(@social_fi);
        let post = Post {
            author: author_addr,
            content_hash,
            timestamp: timestamp::now_seconds(),
            likes: 0
        };
        
        store.post_count = store.post_count + 1;
        vector::push_back(&mut store.posts, post);

        event::emit_event(
            &mut store.post_events,
            PostEvent {
                post_id: store.post_count,
                author: author_addr,
                content_hash
            }
        );
    }
}