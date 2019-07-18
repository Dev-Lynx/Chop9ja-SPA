export const Masks = {
    email: [
        {
            regexp: /^[\w\-_.]+$/,
            placeholder: "email"
        },
        { fixed: "@" },
        {
            regexp: /^[\w]+$/,
            placeholder: "example"
        },
        { fixed: "." },
        {
            regexp: /^[\w]+$/,
            placeholder: "com"
        }
    ],
    phone: [ { fixed: "+234 " },
        {
            length: 3,
            regexp: /^(?!0)[0-9]{1,3}$/,
        },
        { fixed: " "},
        {
            length: 3,
            regexp: /^[0-9]{1,3}$/,
        },
        { fixed: " "},
        {
            length: 4,
            regexp: /^[0-9]{1,4}$/,
        }
    ],
}

export const RegularExpressions = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^[0-9]{11}$/,
    globalSpace: /\s/g,
}