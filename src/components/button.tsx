interface IProps {
  canClick: boolean
  loading: boolean
  actionText: string
}

export const Button: React.FC<IProps> = ({ canClick, loading, actionText }) => (
  <button className='btn' disabled={!canClick}>
    {loading ? 'Loading...' : actionText}
  </button>
)
