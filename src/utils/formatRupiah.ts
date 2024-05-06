export const formatRupiah = (amount: number): string => {
    if (amount === undefined || amount === null) {
        return 'Rp0';
    }
    return 'Rp' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
