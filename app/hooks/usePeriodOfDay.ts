export default function UsePeriodOfDay(){
    const currentHour = (new Date().getHours() + (-3 + 24))%24;

    if (currentHour >= 5 && currentHour < 12) {
        return 'Bom dia';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}