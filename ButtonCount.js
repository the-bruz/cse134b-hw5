class ButtonCount extends HTMLElement {
    constructor() {
        super();

        let shadowRoot = this.attachShadow({mode: "open"})
        let button = document.createElement('button')
        button.innerHTML = 'Times Clicked: 0'
        shadowRoot.appendChild(button)
        this.count = 0

        button.addEventListener('click', (event) => {
            this.count++
            button.innerHTML = `Times Clicked: ${this.count}`
        })
    }
}

customElements.define("button-count", ButtonCount)