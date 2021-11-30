export default interface transaction{
    id_transaction_category?: string
    transaction_category?: string
    id_transaction?: string
    id_user_wallet?: string
    title?:string
    description?: string
    type?: string
    amount?: number
    created_at?: Date
}