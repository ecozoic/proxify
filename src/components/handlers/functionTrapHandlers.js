/**
 * Created by Mark.Mosby on 3/1/2016.
 */
import baseTraps from 'baseTrapHandlers';

var funcTraps = Object.create(baseTraps); //delegate to baseTraps for shared handling

funcTraps.apply = function _apply(target, key) {

};

funcTraps.construct = function _construct(target, key) {

};

export default funcTraps;
