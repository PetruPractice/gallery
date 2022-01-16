const cyrb53 = (str, seed = 123) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909)
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909)
    return 4294967296 * (2097151 & h2) + (h1>>>0)
}

const warn = (input, bool) => input.classList.add('is-' + (bool ? 'success' : 'danger')) 
const clean = input => input.classList.remove('is-danger', 'is-success')

const validateEmail = e => {
    const email = e.currentTarget
    clean(email)
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    warn(email, validEmail)
    return validEmail
}

const validatePass = e => {
    const pass = e.currentTarget
    clean(pass)
    const validPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pass.value)
    warn(pass, validPass)
    return validPass
}

const validateRepeatPass = e => {
    const pass = document.getElementById('registerPage').children[1].firstElementChild.firstElementChild
    const repeatPass = e.currentTarget
    const same = pass.value === repeatPass.value
    clean(repeatPass)
    warn(repeatPass, same)
    return same
}

const baseAuth = 'http://localhost:8080/api/user'

const registerUser = e => {
    const registerPage = document.getElementById('registerPage')
    const email = registerPage.children[0].firstElementChild.firstElementChild
    const pass = registerPage.children[1].firstElementChild.firstElementChild
    const repeatPass = registerPage.children[2].firstElementChild.firstElementChild
    const validCredentials = [
        validateEmail({currentTarget: email}),
        validatePass({currentTarget: pass}),
        validateRepeatPass({currentTarget: repeatPass})
    ].every(x => x)
    
    validCredentials && fetch(baseAuth + '/new/' + email.value + '/' + cyrb53(pass.value)).then(res => res.json()).then(({changes}) => {
        if (changes)
            registerPage.innerHTML = '<h1 class="title has-text-success">Registered!</h1>'
        else {
            pass.value = ''
            repeatPass.value = ''
            clean(pass)
            clean(repeatPass)
        }
    })
} 

const loginUser = e => {
    const loginPage = document.getElementById('loginPage')
    const email = loginPage.children[0].firstElementChild.firstElementChild
    const pass = loginPage.children[1].firstElementChild.firstElementChild
    const validCredentials = [
        validateEmail({currentTarget: email}),
        validatePass({currentTarget: pass})
    ].every(x => x)
    validCredentials && fetch(baseAuth + '/auth/' + email.value + '/' + cyrb53(pass.value)).then(res => res.json()).then(({found}) => {
        if (found)
            window.location.pathname = '/albums'
        else {
            pass.value = ''
            clean(pass)
        }
    })
}


const changeTab = e => {
    const page = e.currentTarget.innerText
    const tab = e.currentTarget.parentElement
    const tabs = tab.parentElement.children
    for (const tab of tabs) {
        tab.classList.remove('is-active')
    }
    tab.classList.add('is-active')
    document.getElementById(page.toLowerCase() + 'Page').style.display = 'block'
    document.getElementById(page === 'Login' ? 'registerPage' : 'loginPage').style.display = 'none'    
}

const LoginPage = () => (
    <div id='loginPage'>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" onKeyPress={validateEmail} />
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" onKeyDown={validatePass} />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-right has-text-centered">
                <a class='button' onClick={loginUser}>Login</a>
            </p>
        </div>
    </div>
)

const RegisterPage = () => (
    <div id='registerPage' style='display: none'>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" onKeyDown={validateEmail} />
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" onKeyDown={validatePass} />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Repeat Password" onKeyDown={validateRepeatPass} />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-right has-text-centered">
                <a class='button' onClick={registerUser}>Register</a>
            </p>
        </div>
    </div>
)

export default () => (
    <section class='section'>
        <div class="tabs is-centered is-large is-boxed">
            <ul>
                <li class="is-active"><a onClick={changeTab}>Login</a></li>
                <li><a onClick={changeTab}>Register</a></li>
            </ul>
        </div>
        <LoginPage />
        <RegisterPage />
    </section>
)
