import React, { useCallback, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useStores } from 'stores'
import InfoContainer from './InfoContainer'
import TimeTableContainer from './TimeTableContainer'
import Main from 'components/Main'
import MainChat from 'components/Main/MainChat'
import MainTimeTable from 'components/Main/MainTimeTable'
import MainLuckydraw from 'components/Main/MainLuckydraw'
import MainSurveyContainer from './MainSurvey/MainSurveyContainer'
import Header from 'components/Header'
import chatIcon from 'assets/images/chatting-icon@3x.png'
import qnaIcon from 'assets/images/qna-icon@3x.png'
import timeTableIcon from 'assets/images/timetable-icon@3x.png'
import surveyIcon from 'assets/images/survey-icon@3x.png'
import luckydrawIcon from 'assets/images/luckydraw-icon@3x.png'
import chatActiveIcon from 'assets/images/chatting-active-icon@3x.png'
import qnaActiveIcon from 'assets/images/qna-active-icon@3x.png'
import timeTableActiveIcon from 'assets/images/timetable-active-icon@3x.png'
import surveyActiveIcon from 'assets/images/survey-active-icon@3x.png'
import luckydrawActiveIcon from 'assets/images/luckydraw-active-icon@3x.png'

const MainContainer = observer(() => {
  const { WebinarInfoStore } = useStores()
  const { getWebinarInfo, link, title, detail } = WebinarInfoStore
  const store = useLocalStore(() => ({
    menuIndex: 0,
    changeMenu: (index) => {
      store.menuIndex = index
    },
    sideMenuIndex: 0,
    changeSideMenu: (index) => {
      store.sideMenuIndex = index
    },
  }))
  const { menuIndex, changeMenu, sideMenuIndex, changeSideMenu } = store

  const handleGetWebinarInfo = useCallback(() => {
    getWebinarInfo().catch((error) => {
      return error
    })
  }, [getWebinarInfo])

  const InfoMenus = [
    { title: '정보', contents: InfoContainer },
    { title: '타임테이블', contents: TimeTableContainer },
  ]

  const SideMenuInfo = [
    { title: '채팅', img: chatIcon, active: chatActiveIcon, content: <MainChat /> },
    { title: 'Q&A', img: qnaIcon, active: qnaActiveIcon, content: <MainSurveyContainer /> },
    { title: '타임테이블', img: timeTableIcon, active: timeTableActiveIcon, content: <MainTimeTable /> },
  ]

  useEffect(() => {
    handleGetWebinarInfo()
  }, [])

  return (
    <>
      <Header />
      <Main
        InfoMenus={InfoMenus}
        menuIndex={menuIndex}
        changeMenu={changeMenu}
        sideMenuIndex={sideMenuIndex}
        changeSideMenu={changeSideMenu}
        SideMenuInfo={SideMenuInfo}
        link={link}
        title={title}
        detail={detail}
      />
    </>
  )
})

export default MainContainer
