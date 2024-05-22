export default function ErrorMessage ({ message }) {
    if (!message) return null

    return (
        <div className='alert alert-error'>
            <div className='flex' style={{ color: 'red', fontStyle: 'italic' }}>
                <span>{message}</span>
            </div>
        </div>
    )
}
