export const csrfToken = ()=>
     document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
