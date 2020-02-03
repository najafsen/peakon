export const getNameInitials = (name) => {
    name = name || '';
    const nameParts = name.split(' ');
    
    if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }

    return nameParts[0] ? nameParts[0][0].toUpperCase() : 'n/a';
}