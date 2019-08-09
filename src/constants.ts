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
    date: [
        { 
            length: [1, 2],
            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
            placeholder: "dd"
        }, 
        { fixed: "/" },
        { 
            length: [1, 2],
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: "mm"
        }, 
        { fixed: "/" },
        {
            length: 4,
            regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
            placeholder: "yyyy"
        }
    ]
}

export const RegularExpressions = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^[0-9]{11}$/,
    globalSpace: /\s/g,
}