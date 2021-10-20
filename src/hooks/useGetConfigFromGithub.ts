
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Git from 'services/github'
import { setListUserAccept, setGithubConfig } from 'state/application/actions'
import { ENV_GIT_TOKEN_LIST_FILENAME } from 'constants/index'

const git = new Git()
const env_filename_token_swap = ENV_GIT_TOKEN_LIST_FILENAME
const env_filename_config = "config.js"

export default function useGetListUserAccept() {
  const dispatch = useDispatch()

  const getConfig = useCallback(async () => {
    await git.getRepoTreeAtOrgan().then(async () => { 
      Promise.all([
        git.getFileData(env_filename_token_swap),
        git.getFileData(env_filename_config) 
      ]).then(([userList, config]) => {
        dispatch(setListUserAccept(userList))
        dispatch(setGithubConfig(config))
      }).catch(console.error)
    }).catch(console.error)
  }, [dispatch]) 

  useEffect(() => {
    getConfig() 
  }, [getConfig])

}
