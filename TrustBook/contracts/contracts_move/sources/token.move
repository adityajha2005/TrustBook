/// token.move
module social_fi::token {
    use std::string;
    use aptos_framework::coin::{Self, BurnCapability, FreezeCapability, MintCapability};
    use aptos_framework::account;

    /// Error codes
    const ENO_CAPABILITIES: u64 = 1;
    const ENO_PERMISSIONS: u64 = 2;

    struct SocialFiToken has key {}

    struct Capabilities has key {
        mint_cap: MintCapability<SocialFiToken>,
        burn_cap: BurnCapability<SocialFiToken>,
        freeze_cap: FreezeCapability<SocialFiToken>
    }

    public entry fun initialize(admin: &signer) {
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<SocialFiToken>(
            admin,
            string::utf8(b"SocialFiToken"),
            string::utf8(b"SFT"),
            8,
            true,
        );

        move_to(admin, Capabilities {
            mint_cap,
            burn_cap,
            freeze_cap,
        });
    }

    public entry fun mint(
        admin: &signer,
        amount: u64,
        to: address
    ) acquires Capabilities {
        let admin_addr = account::get_signer_capability_address(admin);
        assert!(exists<Capabilities>(admin_addr), ENO_CAPABILITIES);
        
        let caps = borrow_global<Capabilities>(admin_addr);
        let coins = coin::mint(amount, &caps.mint_cap);
        coin::deposit(to, coins);
    }
}


