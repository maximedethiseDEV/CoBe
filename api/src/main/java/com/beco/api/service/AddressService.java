package com.beco.api.service;

import com.beco.api.model.Address;
import com.beco.api.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    // Créer une nouvelle adresse
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    // Lire une adresse par son ID
    public Optional<Address> getAddressById(Integer id) {
        return addressRepository.findById(id);
    }

    // Récupérer toutes les adresses
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    // Mettre à jour une adresse
    public Address updateAddress(Integer id, Address addressDetails) {
        Optional<Address> addressOptional = addressRepository.findById(id);
        if (addressOptional.isPresent()) {
            Address address = addressOptional.get();
            address.setStreet(addressDetails.getStreet());
            address.setCity(addressDetails.getCity());
            return addressRepository.save(address);
        }
        return null; // ou une exception personnalisée peut être lancée.
    }

    // Supprimer une adresse
    public void deleteAddress(Integer id) {
        addressRepository.deleteById(id);
    }
}
