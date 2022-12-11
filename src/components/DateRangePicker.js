import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { DateRangePicker as DateRangePickerLib } from 'react-date-range';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
	const handleSelect = ranges => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};
	const selectionRange = {
		startDate: startDate ? startDate : new Date(),
		endDate: endDate ? endDate : new Date(),
		key: 'selection',
	};

	const [showDatePicker, setShowDatePicker] = useState();
  useEffect(() => {
		if (showDatePicker) {
			document.body.addEventListener('click', () => {
				setShowDatePicker(false);
			});
		}
	}, [showDatePicker]);
	return (
		<div className='date-rage-picker-component' onClick={e => e.stopPropagation()}>
			<div onClick={() => setShowDatePicker(!showDatePicker)} id='reportrange' className='range_picker'>
				{startDate && format(new Date(startDate?.toISOString()), 'MMM dd, yyyy')} -{' '}
				{endDate && format(new Date(endDate?.toISOString()), 'MMM dd, yyyy')}
				<b className='caret' />
			</div>
			{showDatePicker && (
				<DateRangePickerLib
					rangeColors={['#ef2042']}
					ranges={[selectionRange]}
					onChange={handleSelect}
					months={1}
					showSelectionPreview={true}
					moveRangeOnFirstSelection={false}
				/>
			)}

			{/* </div> */}
		</div>
	);
};

export default DateRangePicker;
