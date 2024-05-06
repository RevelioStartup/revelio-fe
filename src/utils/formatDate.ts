export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
