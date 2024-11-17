/// chat.move
module social_fi::chat {
    use std::string::{Self, String};
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::account;

    struct Message has store, drop {
        sender: address,
        content: String,
        is_picture: bool,
        timestamp: u64
    }

    struct ChatStore has key {
        messages: vector<Message>,
        message_events: EventHandle<MessageEvent>,
    }

    struct MessageEvent has drop, store {
        message_id: u64,
        sender: address,
        content: String,
        is_picture: bool,
        timestamp: u64,
    }

    const ENO_STORE: u64 = 1;
    const EMPTY_CONTENT: u64 = 2;

    public entry fun initialize(account: &signer) {
        let store = ChatStore {
            messages: vector::empty(),
            message_events: event::new_event_handle<MessageEvent>(account),
        };
        move_to(account, store);
    }

    public entry fun send_message(
        sender: &signer,
        content: String,
        is_picture: bool
    ) acquires ChatStore {
        let sender_addr = signer::address_of(sender);
        assert!(string::length(&content) > 0, EMPTY_CONTENT);
        
        let store = borrow_global_mut<ChatStore>(@social_fi);
        let message = Message {
            sender: sender_addr,
            content,
            is_picture,
            timestamp: timestamp::now_seconds(),
        };

        let message_id = vector::length(&store.messages);
        vector::push_back(&mut store.messages, message);

        event::emit_event(&mut store.message_events, MessageEvent {
            message_id,
            sender: sender_addr,
            content,
            is_picture,
            timestamp: timestamp::now_seconds(),
        });
    }

    #[view]
    public fun get_message_count(): u64 acquires ChatStore {
        let store = borrow_global<ChatStore>(@social_fi);
        vector::length(&store.messages)
    }
}

