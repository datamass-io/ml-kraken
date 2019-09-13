export function parseUnix(data): string {
    const date = new Date(data);

    const year = date.getFullYear();
    const month = '0' + (date.getMonth() + 1);
    const day = '0' + date.getDate();

    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime =
        year +
        '-' +
        month.substr(-2) +
        '-' +
        day.substr(-2) +
        ' ' +
        hours +
        ':' +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2);

    return formattedTime;
}
