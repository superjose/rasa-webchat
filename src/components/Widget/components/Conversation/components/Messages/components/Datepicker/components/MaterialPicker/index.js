// @ts-check
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

import React, { memo, useState } from 'react';

export const MaterialPicker = memo(props => {
    const [date, setDate] = useState();
    const { handleDateChange,  disableFuture, disablePast } = props;

    const onChange = (date) => {
        setDate(date);
        handleDateChange(date);
    }

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    {...props}
                    label={props.label || 'Fecha'}
                    // https://github.com/mui-org/material-ui-pickers/issues/1651#issuecomment-614315006
                    autoOk={true}
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={date}
                    onChange={onChange}
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                   
                    InputLabelProps={{ shrink: true }}
                />
            </MuiPickersUtilsProvider>
        </>
    );
});
