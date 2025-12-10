;; Faucet Contract
;; Gives 0.01 STX to sender once every 24 hours (approx 144 blocks)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_COOLDOWN_ACTIVE (err u100))
(define-constant ERR_INSUFFICIENT_BALANCE (err u101))
(define-constant FAUCET_AMOUNT u10000) ;; 0.01 STX = 10,000 mSTX
(define-constant COOLDOWN_BLOCKS u144) ;; ~24 hours

;; Data Maps
(define-map ConstantClaims principal uint)

;; Public Functions

(define-read-only (get-last-claim (user principal))
    (default-to u0 (map-get? ConstantClaims user))
)

(define-public (claim)
    (let
        (
            (caller tx-sender)
            (current-block block-height)
            (last-claim (get-last-claim caller))
        )
        ;; Check cooldown
        (asserts! (>= (- current-block last-claim) COOLDOWN_BLOCKS) ERR_COOLDOWN_ACTIVE)
        
        ;; Transfer STX
        (try! (as-contract (stx-transfer? FAUCET_AMOUNT tx-sender caller)))
        
        ;; Update Claim History
        (map-set ConstantClaims caller current-block)
        
        (ok true)
    )
)

(define-public (add-funds (amount uint))
    (stx-transfer? amount tx-sender (as-contract tx-sender))
)
