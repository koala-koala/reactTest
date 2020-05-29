import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { TodosDispatch } from './Hook'

function SubHook({name}) {
  const dispatch = useContext(TodosDispatch);
  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'updateName',
          payload: 'koala',
        })
      }}>修改{name}</button>
    </div>
  )
}

SubHook.propTypes = {

}

export default SubHook

