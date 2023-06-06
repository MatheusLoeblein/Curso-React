import './styles.css'
import P from 'prop-types'

export const TextInput = ({searchValue, handleChange}) => (
    <input
    className="text-input"
    onChange={handleChange}
    value={searchValue}
    type="search"
    placeholder="Pesquisar"
    />

);

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
}
