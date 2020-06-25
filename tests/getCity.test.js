import { getDestination } from '../src/client/js/utils';

test('should return Munich', () => {
    beforeEach(() => {
        document.body.innerHTML =
            '<input type="text" id="destination">' + 'munich' + '</input>';
    });
    afterEach(() => {
        const destination = getCity();
        expect(destination).toEqual('Munich');
    });
});