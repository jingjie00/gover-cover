module recorddescription::message {
    use std::error;
    use std::signer;
    use std::string;
    use aptos_framework::event;

    //:!:>resource
    struct MessageHolder has key {
        message: string::String,
    }
    //<:!:resource

    #[event]
    struct MessageChange has drop, store {
        account: address,
        from_message: string::String,
        to_message: string::String,
    }

    /// There is no message present
    const ENO_MESSAGE: u64 = 0;

    #[view]
    public fun get_message(addr: address): string::String acquires MessageHolder {
        assert!(exists<MessageHolder>(addr), error::not_found(ENO_MESSAGE));
        borrow_global<MessageHolder>(addr).message
    }

    public entry fun set_message(account: signer, message: string::String)
    acquires MessageHolder {
        let account_addr = signer::address_of(&account);
        if (!exists<MessageHolder>(account_addr)) {
            move_to(&account, MessageHolder {
                message,
            })
        } else {
            let old_message_holder = borrow_global_mut<MessageHolder>(account_addr);
            let from_message = old_message_holder.message;
            event::emit(MessageChange {
                account: account_addr,
                from_message,
                to_message: copy message,
            });
            old_message_holder.message = message;
        }
    }

    #[test(account = @0x1)]
    public entry fun sender_can_set_message(account: signer) acquires MessageHolder {
        let addr = signer::address_of(&account);
        aptos_framework::account::create_account_for_test(addr);
        set_message(account, string::utf8(b"Testing Record Transaction"));

        assert!(
            get_message(addr) == string::utf8(b"Testing Record Transaction"),
            ENO_MESSAGE
        );
    }
}

// aptos move compile --named-addresses recorddescription=0xa21cdd92d7709bc02b8ef778de792e0cae2f7265d865204c4f50292365364034
// aptos move create-object-and-publish-package --address-name recorddescription --named-addresses recorddescription=0xa21cdd92d7709bc02b8ef778de792e0cae2f7265d865204c4f50292365364034

// 0x95f2511d231f2ef854467a101dd8d3aba8f6673407eb2fffec0da73ce5c8bd88

// aptos move run --function-id '0x95f2511d231f2ef854467a101dd8d3aba8f6673407eb2fffec0da73ce5c8bd88::message::set_message' --args "string: Transfer to-> Jason ; string: Malaysian Identity Card Hash-> bab2455a57524929c19827240dfec07f ; string: Program-> Student Assistantship ; string: Collab-> Apple Pencil Free Gift from Urban Republic"
