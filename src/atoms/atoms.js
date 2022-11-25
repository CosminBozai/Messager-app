import { atom } from "jotai";

export const logStatusAtom = atom(false);
export const showLoginModalAtom = atom(false);
export const showSignupModalAtom = atom(false);
export const iconModalAtom = atom(false);
export const userAtom = atom(null);
export const activeFriendAtom = atom({});
export const focusedAtom = atom(null);
export const msgDocAtom = atom(null);
