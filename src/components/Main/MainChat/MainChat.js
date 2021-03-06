import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { Checkbox } from 'antd'
import { useStores } from 'stores'
import { limitEnterNum, checkLineOver, checkLength } from 'utils/stringFormat'
import Swal from 'sweetalert2'
import nonConnectIcon from 'assets/images/non-connect-icon@2x.png'
import connectIcon from 'assets/images/connect-icon@2x.png'
import exclamationIcon from 'assets/images/exclamation-icon@3x.png'
import './MainChat.scss'
import { GOOGLE_ID } from '../../../config/config.json'
import { GoogleLogin } from 'react-google-login'

const MainChat = observer(() => {
  let history = useHistory()
  const { chatStore, userStore } = useStores()
  const { chatText, chatList, onChatChange, qnaCheck, toggleCheck } = chatStore
  const { accessToken, socket, userData } = userStore
  const chatRef = useRef()

  const inputChange = (e) => {
    let chat = limitEnterNum(e.target.value)
    const maxRow = e.target.rows
    if (checkLineOver(chat, maxRow)) {
      Swal.fire({
        title: '줄 제한',
        text: '7줄 이상 입력할 수 없습니다.',
        icon: 'warning',
      })
      return
    }
    if (checkLength(chat, 300)) {
      Swal.fire({
        title: '300자 제한',
        text: '300자 이상 채팅할 수 없습니다.',
        icon: 'warning',
      })
      chat = chat.substring(0, 300)
    }
    onChatChange(chat)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (accessToken.length === 0) {
      Swal.fire({
        title: '오류',
        text: '로그인이 필요한 서비스 입니다.',
        icon: 'error',
      })
      history.push('/login')
    } else {
      if (chatText.length > 0 && (chatText.trim() !== '' || chatText.trim().length !== 0)) {
        const chatData = {
          text: chatText,
          question: qnaCheck
        }

        socket.emit('send message', chatData)
        // console.log('send msg', chatData, socket)
        if(qnaCheck) toggleCheck()
      }
      onChatChange('')
    }
  }

  const checkChatAccess = () => {
    if (accessToken.length === 0) {
      return (
        <div
          className={'noAccess'}
          onClick={() => {
            Swal.fire({
              title: '로그인 필요',
              text: '로그인 페이지로 이동합니다.',
              icon: 'info',
            })
            history.push('/login')
          }}
        >
          <img src={exclamationIcon} alt={'exclamation_mark'}/>
          <p>로그인이 필요합니다.</p>
        </div>
      )
    } else {
      return (
        <textarea
          rows={6}
          id="chatInput"
          value={chatText}
          onKeyPress={handleUserKeyPress}
          onChange={inputChange}
          placeholder={'대화 내용을 입력...'}
        />
      )
    }
  }

  const checkMyMsg = (chat) => {
    if (chat.student_id === userData.studentId && chat.student_name === userData.studentName) {
      return 'inChatBox me'
    } else {
      return 'inChatBox'
    }
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // e.preventDefault();
      onSubmit(e) // this won't be triggered
    }
  }

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }, [])

  return (
    <div className={'chatContainer'}>
      <div className={'chatLogBox'}>
        {chatList.map((chat, idx) => (
          <div className={checkMyMsg(chat)} key={`chat${idx}`}>
            <p className={'chatName'}>
              {chat.student_name}{' '}
              <em>
                ({chat.student_name === '01' ? 'MIT' : chat.school_name} | {chat.student_name === '01' ? '0000' : chat.student_id})
              </em>
            </p>
            <p className={'chatContent'}>{chat.text}</p>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <Checkbox className={'checkbox'} checked={qnaCheck} onChange={toggleCheck}>Q&A 탭에 노출하기</Checkbox>
      <form onSubmit={onSubmit}>
        <div className={'chatBox'}>
          {checkChatAccess()}
        </div>
        <div className={'chatEnterArea'}>
          <button type="submit" className={'chatEnterIcon'} />
        </div>
      </form>
    </div>
  )
})

export default MainChat
