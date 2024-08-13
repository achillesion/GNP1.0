export class FormatterDate {
	public static formatDate({
		dateString,
		full = true,
	}: {
		dateString: string;
		full?: boolean;
	}) {
		const date = new Date(dateString);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return full
			? `${year}-${month}-${day} ${hours}:${minutes}`
			: `${year}-${month}-${day}`;
	}

	public static formatDateForCreate(vacancyDate: string, vacancyTime: string) {
		const [year, month, day] = vacancyDate.split("-").map(Number);

		const [hours, minutes] = vacancyTime.split(":").map(Number);

		return new Date(year, month - 1, day, hours, minutes);
	}

	public static formatterDateForUpdateHangar(
		vacancyDate: string,
		vacancyTime: string
	) {
		const date = new Date(vacancyDate);
		const time = new Date(vacancyTime);
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			time.getHours(),
			time.getMinutes()
		);
	}
}
