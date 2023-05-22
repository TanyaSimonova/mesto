export default class UserInfo {
  constructor(nameSelector, jobSelector){
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { name: this._profileName.textContent, speciality: this._profileJob.textContent}
  }

  setUserInfo(infoUser) {
    this._profileName.textContent = infoUser.name;
    this._profileJob.textContent = infoUser.speciality;
  }
}
