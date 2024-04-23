export function validateEmail(email)
{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email))
    {
        return true;
    }
    else 
    {
        return false;
    }

}

export function validatePassword(password)
{
    const regex=/^[0-9a-zA-Z@$#]+$/;

    if(regex.test(password))
    {
        return true;
    }
    else 
    {
        return false;
    }

}