import CloseError from './closeError.js';

export default function showErrors($errorsDiv, errors){
  errors.forEach(function(error){
    var errorHTML = `
      <div class="card-panel red lighten-2 white-text row">
        <div class="col s11">
          ${error}
        </div>
        <span class="right-align col s1" name="closeErrorBtn">×</span>
      </div>
      `;
    $errorsDiv.append(errorHTML);
  });
  (new CloseError()).update();
}
