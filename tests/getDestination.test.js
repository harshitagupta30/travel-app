import { getDestination } from '../src/client/js/utils';

describe('Test to check the destination', () => {
    test('should return Munich', () => {
        beforeEach(() => {
            document.body.innerHTML =
                '<input type="text" id="destination">' + 'munich' + '</input>';
        });
        afterEach(() => {
            const destination = getDestination();
            expect(destination).toEqual('Munich');
        });
    });
});