

export function Star({form, readOnly, starRating, hover, setHover, setStarRating, stars}) {

  return (
    <div
      onClick={() => {
        if (readOnly) return null
        setStarRating(stars)
        form.setFieldValue('rating', stars)
      }}
      onMouseEnter={() => {
        if (readOnly) return null
        setHover(stars)}}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        data-rating={stars}
        fill={stars <= (hover || starRating) ? 	'gold' : 'darkgray'}
        height="25"
        viewBox="0 0 25 25"
        width="25"
      >
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  )
}