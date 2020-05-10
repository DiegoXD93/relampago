import { firebaseAuth, firebase } from "boot/firebase";
const state = {
  loggedIn: false,
  user: {
    email: ""
  },
  errors: {
    "auth/expired-action-code": "El código de restablecimiento de contraseña ha expirado.",
    "auth/invalid-action-code": "El código de restablecimiento de contraseña no es válido.",
    "auth/user-disabled": "El usuario ha sido deshabilitado.",
    "auth/user-not-found": "No hay ningún usuario correspondiente al correo electrónico",
    "auth/weak-password": "La contraseña no es lo suficientemente segura.",
    "auth/email-already-in-use": "Ya existe una cuenta con la dirección de correo electrónico dada",
    "auth/operation-not-allowed": "Las cuentas de correo electrónico / contraseña no están habilitadas",
    "auth/invalid-email": "La dirección de correo electrónico no es válida",
    "auth/wrong-password": "La contraseña no es válida"
  }
};
const mutations = {
  setLoggedIn(state, payload) {
    state.loggedIn = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};
const actions = {
  logInFacebook({ commit }, payload) {
    var provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          var user = result.user;
          resolve(result)
        }).catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;
          var email = err.email;
          var credential = err.credential;
          reject(err)
        })
    })
  },
  registerUser({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
          commit("setLoggedIn", true);

          resolve();
        })
        .catch(err => {
          reject(getters["getError"](err.code));
        });
    });
  },
  loginUser({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
          resolve();
        })
        .catch(err => {
          reject(getters["getError"](err.code));
        });
    });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit("setLoggedIn", true);
      } else {
        commit("setLoggedIn", false);
      }
    });
  }
};
const getters = {
  getError: (state) => (code) => {
    if (state.errors[code]) {
      console.log(code)
      return state.errors[code]
    } else {
      return "Ocurrio un error inesperado: " + code;
    }
  }
};
export default { namespaced: true, state, mutations, actions, getters };
