import { useEffect, useState, useMemo } from 'react';

import moment from 'moment';
import 'moment-timezone';

type TimeMoment = moment.Moment;
const Time = ({ city, country, format = 'HH:mm' }: { city: string, country: string, format: string }) => {
    const [time, setTime] = useState<TimeMoment>(moment());
    const timeZone = useMemo(() => `${country}/${city}`, [city, country]);
    useEffect(() => {
        if(moment.tz.zone(timeZone)) {
            const interval = setInterval(() => {
                setTime(moment());
            }, 1000);

            return () => clearInterval(interval);
        } else {
            return () => {}
        }
    }, [timeZone]);
    if(!moment.tz.zone(timeZone)) {
        return null;
    }

    const formattedTime = time.format(format);
    const gmtOffset = time.format('Z');

    
    return {
        formattedTime,
        gmtOffset
    }
}

export default Time;