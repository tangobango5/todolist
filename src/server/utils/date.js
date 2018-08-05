function pad(n) {
	return n<10 ? '0'+n : n
}

function ISODateString(inDate) {
	inDate = typeof inDate === 'string' || typeof inDate === 'number' ? new Date(inDate) : inDate;
	return inDate.getUTCFullYear()+'-'
		+ pad(inDate.getUTCMonth()+1)+'-'
		+ pad(inDate.getUTCDate())+'T'
		+ pad(inDate.getUTCHours())+':'
		+ pad(inDate.getUTCMinutes())+':'
		+ pad(inDate.getUTCSeconds())+'Z'
}

export { ISODateString };
