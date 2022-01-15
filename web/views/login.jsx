
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
                <input class="input" type="email" placeholder="Email" />
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
                <input class="input" type="password" placeholder="Password" />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-right has-text-centered">
                <a class='button' href="/albums">Login</a>
            </p>
        </div>
    </div>
)

const RegisterPage = () => (
    <div id='registerPage' style='display: none'>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" />
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
                <input class="input" type="password" placeholder="Password" />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Repeat Password" />
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-right has-text-centered">
                <a class='button' href="/albums">Register</a>
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
