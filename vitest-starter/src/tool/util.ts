// 퍼센트, 날짜, 통화 포매팅 유틸리티 함수 사용

function formatCurrency(value: number, currency: string = 'USD') {
  return new Intl.NumberFormat('ko', {
    style: 'currency',
    currency,
  }).format(value);
}

function formatDate(date: Date, locale: string = 'en') {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(date);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'percent',
  }).format(value);
}

export { formatCurrency, formatDate, formatPercent };
