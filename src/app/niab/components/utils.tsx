export const getNickName = (email?: string) => {
    let emailToParse = '';
    if (email) {
        emailToParse = email;
    } else {
        emailToParse = localStorage.getItem('user');
    }

    const [nickname] = emailToParse ? emailToParse.split('@') : [];
    return nickname ? nickname : 'anonymous';
};