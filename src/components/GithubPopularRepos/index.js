import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const loadingProgress = {
  loading: 'LOADING',
  loaded: 'LOADED',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repoList: [],
    isLoading: loadingProgress.loading,
  }

  componentDidMount() {
    this.getRepos()
  }

  onClickLanguage = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepos)
  }

  getRepos = async () => {
    this.setState({isLoading: loadingProgress.loading})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${
      languageFiltersData.find(eachItem => eachItem.id === activeLanguageId)
        .language
    }`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({repoList: formatedData, isLoading: loadingProgress.loaded})
    } else {
      this.setState({isLoading: loadingProgress.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeLanguageId, repoList, isLoading} = this.state

    let content

    switch (isLoading) {
      case loadingProgress.loading:
        content = this.renderLoader()
        break
      case loadingProgress.failure:
        content = (
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
        )
        break
      case loadingProgress.loaded:
        content = (
          <ul>
            {repoList.length > 0 ? (
              repoList.map(eachItem => (
                <RepositoryItem data={eachItem} key={eachItem.id} />
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </ul>
        )
        break
      default:
        content = null
    }

    return (
      <div className="web-container">
        <h1 className="main-heading">Popular</h1>
        <div className="language-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              data={eachItem}
              activeLanguageId={activeLanguageId}
              key={eachItem.id}
              onClickLanguage={this.onClickLanguage}
            />
          ))}
        </div>
        <div>{content}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
