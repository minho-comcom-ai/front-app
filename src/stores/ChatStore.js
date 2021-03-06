import { action, computed, observable } from 'mobx'
import { persist } from 'mobx-persist'

export default class ChatStore {
  @observable qnaCheck
  @observable chatText
  @observable @persist('list') chatList = []

  constructor() {
    this.qnaCheck = false
    this.chatText = ''
    this.chatList = [
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      // { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'blah blah blah' },
      { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'test sample' },
      { student_name: '조영일', school_name: 'MIT', student_id: '0000', text: 'qna test sample', question: true },
    ]
  }

  @action
  toggleCheck = (e) => {
    this.qnaCheck = !this.qnaCheck
  }

  @action
  onChatChange = (value) => {
    this.chatText = value
  }

  @action
  chatListUpdate = (data) => {
    if (this.chatList.length > 99) this.chatList.splice(0, this.chatList.length - 99)
    this.chatList.push(data)
  }

  @computed
  get questionList() {
    return this.chatList.filter((chatData) => chatData.question === true)
  }
}
