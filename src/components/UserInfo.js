export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector){
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._profileName.textContent, speciality: this._profileJob.textContent}
  }

  setUserInfo({name, speciality, avatar}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = speciality;
    this._profileAvatar.src = avatar;
  }
}
