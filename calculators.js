(() => {
  const $ = id => document.getElementById(id);
  document.querySelectorAll('.calc-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.calc-tab,.calc-panel').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    $(tab.dataset.target)?.classList.add('active');
  }));
  const n = id => Number($(id)?.value || 0);
  $('bmiBtn')?.addEventListener('click', () => {
    const h=n('bmiHeight')/100,w=n('bmiWeight'),v=h>0?w/(h*h):0;
    $('bmiValue').textContent=v?v.toFixed(1):'—';
    $('bmiLabel').textContent=!v?'—':v<18.5?'Underweight':v<25?'Normal':v<30?'Overweight':'Obesity';
  });
  $('tdeeBtn')?.addEventListener('click', () => {
    const male=$('gender')?.value==='male', bmr=10*n('tdeeWeight')+6.25*n('tdeeHeight')-5*n('age')+(male?5:-161);
    $('tdeeValue').textContent=Math.round(bmr*n('activity'))||'—';
  });
  $('proteinBtn')?.addEventListener('click', () => {
    const goal=$('proteinGoal')?.value||'maintain', factor=goal==='muscle'?2.0:goal==='fatloss'?2.2:1.6;
    $('proteinValue').textContent=Math.round(n('proteinWeight')*factor)||'—';
  });
  $('waterBtn')?.addEventListener('click', () => {
    const litres=n('waterWeight')*0.035+n('trainingMinutes')*0.012;
    $('waterValue').textContent=litres?litres.toFixed(1):'—';
  });
})();
