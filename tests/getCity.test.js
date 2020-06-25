import { getDestination } from '../src/client/js/utils';

test('should return Munich', () => {
    beforeEach(() => {
        document.body.innerHTML =
            '<div id="destination">' + 'munich' + '</div>';
    });
    afterEach(() => {
        const destination = getCity();
        expect(destination).toEqual('Munich');
    });
});