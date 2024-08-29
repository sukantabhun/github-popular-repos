import './index.css'

const LanguageFilterItem = props => {
  const {data, activeLanguageId, onClickLanguage} = props

  const onClickItem = () => {
    onClickLanguage(data.id)
  }

  const activeClass = data.id === activeLanguageId ? 'active' : ''
  return (
    <button
      className={`header-text ${activeClass}`}
      type="button"
      onClick={onClickItem}
    >
      <p>{data.language}</p>
    </button>
  )
}

export default LanguageFilterItem
