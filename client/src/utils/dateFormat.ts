const dateFormat = (date: Date) => {
    const event = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString(undefined, options as any);
};

export default dateFormat;
