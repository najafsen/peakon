import { getManagers } from "./managers.service";

describe('Managers Service', () => {
    test('#getManagers success', (done) => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ test: 'data' })
        });

        getManagers().then((managers) => {
            expect(managers).toEqual({ test: 'data' });
            done();
        });
    });

    test('#getManagers error', (done) => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce('Error message');
        jest.spyOn(console, 'log').mockImplementation(() => { });

        getManagers().catch((error) => {
            expect(console.log).toHaveBeenCalledWith('An error occurred while getting managers data', 'Error message');
            done();
        });
    });
});