import { atom, atomFamily } from 'recoil'


export const alertState = atom({
  key: `alertState`,
  default:
  {
    active: false,
    text: "",
    callback: null,
  }
});
