const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync('assets/js/scoring.js','utf8'),context);
const M=context.IELTS_SCORING;
test('Listening bands 0/40 30/40 35/40 40/40',()=>{
 assert.equal(M.bandFromRaw(0,'listening'),0);
 assert.equal(M.bandFromRaw(30,'listening'),7);
 assert.equal(M.bandFromRaw(35,'listening'),8);
 assert.equal(M.bandFromRaw(40,'listening'),9);
});
test('Academic Reading bands',()=>{
 assert.equal(M.bandFromRaw(30,'reading'),7);
 assert.equal(M.bandFromRaw(35,'reading'),8);
 assert.equal(M.bandFromRaw(40,'reading'),9);
});
test('Band conversion rejects invalid raw score',()=>{
 assert.equal(M.bandFromRaw(41,'listening'),null);
 assert.equal(M.bandFromRaw(-1,'reading'),null);
 assert.equal(M.bandFromRaw(27.3,'reading'),null);
});
test('Listening answer comparison normalises spacing case punctuation',()=>{
 assert.equal(M.correct('  water-confidence! ','Water confidence'),true);
 assert.equal(M.correct('eastgate','westgate'),false);
 assert.equal(M.correct('nineteenth','19',['nineteenth']),true);
});
test('Writing task 2 is weighted twice as much',()=>{
 assert.equal(M.writing([6,6,6,6],[9,9,9,9]),8);
 assert.equal(M.writing([9,9,9,9],[6,6,6,6]),7);
 assert.equal(M.writing([6,6,'',6],[7,7,7,7]),null);
});
test('Speaking four criteria average',()=>{
 assert.equal(M.speaking([7,7.5,6.5,7]),7);
 assert.equal(M.speaking([9,9,9,9]),9);
 assert.equal(M.speaking([7,7,'',7]),null);
});
